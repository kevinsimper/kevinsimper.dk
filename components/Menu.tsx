import React from 'react'

export const MenuIcon = (
  <svg
    fillRule="evenodd"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    focusable="false"
  >
    <path fill="white" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
  </svg>
)

export type ShownFromOptions = 'left' | 'right'

type MenuProps = {
  children: React.ReactNode
  show: boolean
  onClickClose: () => void
  shownFrom?: ShownFromOptions
}

export const Menu = ({
  children,
  show,
  onClickClose,
  shownFrom = 'left',
}: MenuProps) => {
  if (!show) {
    return <></>
  }
  return (
    <>
      <div
        className="fixed left-0 top-0 right-0 bottom-0 cursor-pointer "
        style={{ backgroundColor: 'rgba(0,0,0,.29)', zIndex: 1 }}
        onClick={onClickClose}
      ></div>
      <div
        className={`bg-white fixed top-0 bottom-0 overflow-y-auto ${
          shownFrom === 'left' ? 'left-0' : 'right-0'
        }`}
        style={{ zIndex: 2 }}
      >
        <div className="p-3 cursor-pointer text-right" onClick={onClickClose}>
          Close
        </div>
        <div onClick={onClickClose}>{children}</div>
      </div>
    </>
  )
}
