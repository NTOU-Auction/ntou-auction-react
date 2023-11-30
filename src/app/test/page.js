"use client"
import React, { useState } from 'react'
import TpModal from '@/components/TpModal'
import styled from 'styled-components'

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
`
const ModalContent = styled.div`
  margin-bottom: 15px;
`

const Practice14 = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggleModalShowUp = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <h1> 打造 Modal 共用組件 </h1>

      {/* 開起視窗按鈕 */}
      <input type='button' value='Show Modal' onClick={handleToggleModalShowUp} />

      {/* 彈跳視窗 */}
      <TpModal
        title='Welcome'
        isVisible={isVisible}
        onClose={handleToggleModalShowUp}
      >

        <ModalContent>
          <div> Would you like to join this team?</div>
        </ModalContent>
        <ModalFooter>
          <button onClick={handleToggleModalShowUp}>Yes</button>
          <button onClick={handleToggleModalShowUp}>Cancel</button>
        </ModalFooter>

      </TpModal>

    </>
  )
}

export default Practice14