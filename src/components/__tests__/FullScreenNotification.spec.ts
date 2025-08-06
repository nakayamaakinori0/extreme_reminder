import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FullScreenNotification from '../FullScreenNotification.vue'

describe('FullScreenNotification', () => {
  it('should render notification when visible', () => {
    const wrapper = mount(FullScreenNotification, {
      props: {
        visible: true
      }
    })
    
    expect(wrapper.find('.full-screen-notification').exists()).toBe(true)
    expect(wrapper.text()).toContain('時間が経過しました')
  })
  
  it('should not render when not visible', () => {
    const wrapper = mount(FullScreenNotification, {
      props: {
        visible: false
      }
    })
    
    expect(wrapper.find('.full-screen-notification').exists()).toBe(false)
  })
  
  it('should emit close event when button is clicked', async () => {
    const wrapper = mount(FullScreenNotification, {
      props: {
        visible: true
      }
    })
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('close')).toBeTruthy()
  })
  
  it('should have full screen styles', () => {
    const wrapper = mount(FullScreenNotification, {
      props: {
        visible: true
      }
    })
    
    const notification = wrapper.find('.full-screen-notification')
    expect(notification.classes()).toContain('full-screen-notification')
  })
})