"use client"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch } from "react-redux"
import { setColorTheme } from "@/redux/features/account/accountSlice"

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

function rgbToHex(rgb: string): string {
  const match = rgb.match(/^rgb$$(\d+),\s*(\d+),\s*(\d+)$$$/)
  if (!match) return "#000000"
  const [, r, g, b] = match.map(Number)
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }).join("")
}

export default function SimpleColorSelector() {
  const [color, setColor] = useState("#ff0000")
  const [rgbValue, setRgbValue] = useState("rgb(255, 0, 0)")
  const dispatch = useDispatch()

  const handleColorChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value
    setColor(newColor)
    setRgbValue(hexToRgb(newColor))
    dispatch(setColorTheme(newColor))
  }, [])

  const handleRgbChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newRgb = event.target.value
    setRgbValue(newRgb)
    if (newRgb.match(/^rgb$$\d+,\s*\d+,\s*\d+$$$/)) {
      setColor(rgbToHex(newRgb))
    }
  }, [])

  return (
    <div className="flex items-end">
      <Input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="w-12 h-12 p-1 rounded cursor-pointer border-none"
        aria-label="Selector de color"
      />
      <div className="flex-grow flex flex-col gap-2">
        <Label htmlFor="rgb-value" className="text-sm font-medium text-muted-foreground text-zinc-900">
          Color principal de su PYME o marca
        </Label>
        <Input
          id="rgb-value"
          type="text"
          value={rgbValue}
          onChange={handleRgbChange}
          className="font-mono bg-white rounded-sm"
          placeholder="rgb(255, 0, 0)"
        />
      </div>
    </div>
  )
}