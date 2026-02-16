import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { X, PaperPlaneRight, Robot, User, Sparkle, Lightning, TrendUp } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Vault } from '@/lib/types'
import { AVAILABLE_STRATEGIES } from '@/lib/strategies'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  suggestions?: string[]
}

interface AlphaBotProps {
  isOpen: boolean
  onClose: () => void
  vaults: Vault[]
  onCreateVault?: (suggestion: string) => void
}

export function AlphaBot({ isOpen, onClose, vaults }: AlphaBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "👋 Hey! I'm Alpha Bot, your AI assistant for IPOR Fusion vaults. I specialize in interest rate derivatives and multi-strategy yield optimization. Ask me about IPOR swaps, rate hedging, vault strategies, or how to use the Python SDK for programmatic access!",
      timestamp: Date.now(),
      suggestions: [
        "What are IPOR interest rate swaps?",
        "Best strategies for stable yields?",
        "Tell me about the Python SDK",
        "How to hedge rate volatility?"
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async (message?: string) => {
    const textToSend = message || input
    if (!textToSend.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const contextInfo = `You are Alpha Bot, an expert DeFi strategy advisor specializing in IPOR Fusion vaults and interest rate derivatives. 

IPOR Protocol Overview:
- IPOR (Interest Rate Oracle Protocol) provides decentralized interest rate derivatives
- Fusion vaults enable advanced yield strategies combining multiple DeFi protocols
- IPOR offers interest rate swaps where users can pay fixed/receive floating or vice versa
- Key focus: stablecoins (USDC, USDT, DAI) with interest rate optimization

IPOR Fusion Python SDK:
- Official Python SDK (ipor-fusion.py) available on GitHub: https://github.com/IPOR-Labs/ipor-fusion.py
- Enables programmatic vault creation, management, and strategy configuration
- Supports all DeFi protocols including IPOR swaps, Aave, Compound, Uniswap, etc.
- Key features: vault management, strategy integration, IPOR swap execution, analytics, auto-rebalancing
- Installation: pip install ipor-fusion
- Documentation: https://docs.ipor.io/build-on-fusion/developer-guide/open-source-repository

Context:
- User has ${vaults.length} active vaults
- Available strategies: ${AVAILABLE_STRATEGIES.map(s => `${s.name} (${s.protocol}, APY: ${s.estimatedAPY}%, Risk: ${s.riskScore}/5)`).join(', ')}
${vaults.length > 0 ? `- Current vaults: ${vaults.map(v => `${v.name} (${v.asset}, APY: ${v.apy}%, TVL: $${(v.tvl/1000000).toFixed(2)}M)`).join(', ')}` : ''}

User question: ${textToSend}

Provide a concise, actionable response (2-3 paragraphs max). Include:
1. Direct answer to their question with IPOR-specific insights where relevant
2. Specific strategy recommendations with protocols and expected APYs
3. Risk considerations and how IPOR derivatives can hedge risks
4. If relevant to their question, mention the Python SDK for programmatic access
5. Action items or suggested vault configurations

Be conversational, confident, and use emojis sparingly. Emphasize IPOR's unique value proposition for interest rate management when appropriate.`
      
      const prompt = window.spark.llmPrompt([contextInfo] as any)
      const response = await window.spark.llm(prompt, 'gpt-4o-mini')
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
        suggestions: generateSuggestions(textToSend, vaults)
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "⚠️ Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const generateSuggestions = (question: string, vaults: Vault[]): string[] => {
    const lowerQ = question.toLowerCase()
    
    if (lowerQ.includes('sdk') || lowerQ.includes('python') || lowerQ.includes('api') || lowerQ.includes('programmatic')) {
      return ["Show me SDK code example", "How to create vault with SDK?", "SDK documentation link?"]
    }
    if (lowerQ.includes('ipor') || lowerQ.includes('swap') || lowerQ.includes('rate')) {
      return ["How do IPOR swaps work?", "Best rate hedging strategy?", "Pay fixed vs receive fixed?"]
    }
    if (lowerQ.includes('risk') || lowerQ.includes('safe') || lowerQ.includes('stable')) {
      return ["Show me stable strategies", "What about staking options?", "Diversification tips?"]
    }
    if (lowerQ.includes('high') || lowerQ.includes('yield') || lowerQ.includes('apy')) {
      return ["What are the risks?", "Compare liquidity vs lending", "Best performing protocols?"]
    }
    if (lowerQ.includes('analyze') || lowerQ.includes('vault') || lowerQ.includes('portfolio')) {
      return ["How can I optimize?", "Rebalancing strategies?", "Add IPOR derivatives?"]
    }
    if (lowerQ.includes('strategy') || lowerQ.includes('best') || lowerQ.includes('recommend')) {
      return ["Explain this strategy", "Risk assessment?", "Alternative options?"]
    }
    if (lowerQ.includes('hedge') || lowerQ.includes('protect') || lowerQ.includes('volatility')) {
      return ["Interest rate swaps?", "Diversification approach?", "Risk mitigation?"]
    }
    if (lowerQ.includes('developer') || lowerQ.includes('build') || lowerQ.includes('integrate')) {
      return ["Python SDK examples?", "API documentation?", "How to automate?"]
    }
    
    return [
      "Optimize existing vaults",
      "Best IPOR swap position?",
      "Tell me about the SDK"
    ]
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="border-primary/30 shadow-2xl bg-card">
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                    <Robot className="text-primary-foreground" size={24} weight="duotone" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkle className="text-accent" size={16} weight="fill" />
                  </motion.div>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Alpha Bot</h2>
                  <p className="text-xs text-muted-foreground">AI Strategy Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X size={20} />
              </Button>
            </div>

            <ScrollArea ref={scrollRef} className="h-[500px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-accent/20' 
                        : 'bg-gradient-to-br from-primary/20 to-accent/20'
                    }`}>
                      {message.role === 'user' ? (
                        <User size={18} className="text-accent" />
                      ) : (
                        <Robot size={18} className="text-primary" weight="duotone" />
                      )}
                    </div>
                    <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                      <div
                        className={`rounded-xl p-4 max-w-[85%] ${
                          message.role === 'user'
                            ? 'bg-accent/20 border border-accent/30'
                            : 'bg-muted/50 border border-border'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
                            {message.suggestions.map((suggestion, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSend(suggestion)}
                                className="text-xs bg-background/50 hover:bg-primary/10 hover:border-primary/50"
                              >
                                <Lightning size={12} className="mr-1" />
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-1">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Robot size={18} className="text-primary" weight="duotone" />
                    </div>
                    <div className="bg-muted/50 border border-border rounded-xl p-4">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask about strategies, risks, or optimization..."
                  className="flex-1 bg-background"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <PaperPlaneRight size={20} weight="fill" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  <TrendUp size={12} className="mr-1" />
                  Powered by GPT-4
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {vaults.length} vault{vaults.length !== 1 ? 's' : ''} analyzed
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
