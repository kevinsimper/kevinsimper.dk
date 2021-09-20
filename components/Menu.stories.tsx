import React, { useState } from 'react'
import { Menu, MenuIcon, ShownFromOptions } from './Menu'

export default { title: 'Admin/Components/Menu' }

export const defaultComponent = () => {
  const label = 'ShownFrom'
  const options = {
    Left: 'left',
    Right: 'right',
  }
  const defaultValue = 'left'

  const [show, setShow] = useState(true)
  const links = [
    { href: 'http://example.com', text: 'Example' },
    { href: 'http://example.com', text: 'Example' },
    { href: 'http://example.com', text: 'Example' },
    { href: 'http://example.com', text: 'Example' },
    { href: 'http://example.com', text: 'Example' },
    { href: 'http://example.com', text: 'Example' },
    { href: 'http://example.com', text: 'Example' },
    { href: 'http://example.com', text: 'Example' },
    { href: 'http://example.com', text: 'Example' },
  ]
  return (
    <div className="h-screen bg-gray-300">
      <button
        onClick={() => {
          setShow(true)
        }}
      >
        <div style={{ width: 25, verticalAlign: -7 }} className="inline-block">
          {MenuIcon}
        </div>
        Show menu
      </button>
      <Menu
        shownFrom={defaultValue}
        show={show}
        onClickClose={() => {
          setShow(false)
        }}
      >
        <div style={{ minWidth: '250px' }}>
          {links.map((l, key) => {
            return (
              <div
                key={key}
                className={`border-t ${
                  links.length === key + 1 ? 'border-b' : ''
                } border-gray-400 hover:bg-gray-200`}
              >
                <a href={l.href} className="p-4 px-6 block">
                  {l.text}
                </a>
              </div>
            )
          })}
        </div>
      </Menu>
    </div>
  )
}
