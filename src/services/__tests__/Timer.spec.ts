import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Timer } from '../Timer'

describe('Timer', () => {
  let timer: Timer
  
  beforeEach(() => {
    vi.useFakeTimers()
    timer = new Timer()
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })
  
  describe('start', () => {
    it('should start the timer with given minutes', () => {
      const callback = vi.fn()
      timer.start(5, callback)
      
      expect(timer.isRunning()).toBe(true)
      expect(timer.getRemainingTime()).toBe(5 * 60 * 1000)
    })
    
    it('should call callback when time is up', () => {
      const callback = vi.fn()
      timer.start(1, callback)
      
      vi.advanceTimersByTime(60 * 1000)
      
      expect(callback).toHaveBeenCalledTimes(1)
      expect(timer.isRunning()).toBe(false)
    })
    
    it('should not start if already running', () => {
      const callback1 = vi.fn()
      const callback2 = vi.fn()
      
      timer.start(5, callback1)
      timer.start(3, callback2)
      
      expect(timer.getRemainingTime()).toBe(5 * 60 * 1000)
    })
  })
  
  describe('stop', () => {
    it('should stop the running timer', () => {
      const callback = vi.fn()
      timer.start(5, callback)
      
      timer.stop()
      
      expect(timer.isRunning()).toBe(false)
      expect(timer.getRemainingTime()).toBe(0)
    })
    
    it('should not call callback when stopped', () => {
      const callback = vi.fn()
      timer.start(1, callback)
      
      timer.stop()
      vi.advanceTimersByTime(60 * 1000)
      
      expect(callback).not.toHaveBeenCalled()
    })
  })
  
  describe('getRemainingTime', () => {
    it('should return remaining time in milliseconds', () => {
      const callback = vi.fn()
      timer.start(5, callback)
      
      vi.advanceTimersByTime(2 * 60 * 1000)
      
      expect(timer.getRemainingTime()).toBe(3 * 60 * 1000)
    })
    
    it('should return 0 when timer is not running', () => {
      expect(timer.getRemainingTime()).toBe(0)
    })
  })
})