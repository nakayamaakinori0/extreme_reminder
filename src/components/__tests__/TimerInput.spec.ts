import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TimerInput from '../TimerInput.vue'

describe('TimerInput', () => {
  it('should render input field and buttons', () => {
    const wrapper = mount(TimerInput)
    
    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
    expect(wrapper.find('button').text()).toContain('開始')
  })
  
  it('should emit start event with minutes value', async () => {
    const wrapper = mount(TimerInput)
    const input = wrapper.find('input[type="number"]')
    
    await input.setValue(10)
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('start')).toBeTruthy()
    expect(wrapper.emitted('start')?.[0]).toEqual([10])
  })
  
  it('should show stop button when timer is running', async () => {
    const wrapper = mount(TimerInput, {
      props: {
        isRunning: true
      }
    })
    
    expect(wrapper.find('button').text()).toContain('停止')
  })
  
  it('should emit stop event when stop button is clicked', async () => {
    const wrapper = mount(TimerInput, {
      props: {
        isRunning: true
      }
    })
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('stop')).toBeTruthy()
  })
  
  it('should validate minimum time is 1 minute', async () => {
    const wrapper = mount(TimerInput)
    const input = wrapper.find('input[type="number"]')
    
    await input.setValue(0)
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('start')).toBeFalsy()
  })
  
  it('should display remaining time when running', () => {
    const wrapper = mount(TimerInput, {
      props: {
        isRunning: true,
        remainingTime: 180000 // 3 minutes in ms
      }
    })
    
    expect(wrapper.text()).toContain('3:00')
  })
})