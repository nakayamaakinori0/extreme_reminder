export class Timer {
  private timeoutId: NodeJS.Timeout | null = null
  private startTime: number = 0
  private duration: number = 0
  private callback: (() => void) | null = null
  
  start(minutes: number, callback: () => void): void {
    if (this.isRunning()) {
      return
    }
    
    this.duration = minutes * 60 * 1000
    this.startTime = Date.now()
    this.callback = callback
    
    this.timeoutId = setTimeout(() => {
      this.callback?.()
      this.reset()
    }, this.duration)
  }
  
  stop(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.reset()
    }
  }
  
  isRunning(): boolean {
    return this.timeoutId !== null
  }
  
  getRemainingTime(): number {
    if (!this.isRunning()) {
      return 0
    }
    
    const elapsed = Date.now() - this.startTime
    const remaining = this.duration - elapsed
    
    return Math.max(0, remaining)
  }
  
  private reset(): void {
    this.timeoutId = null
    this.startTime = 0
    this.duration = 0
    this.callback = null
  }
}