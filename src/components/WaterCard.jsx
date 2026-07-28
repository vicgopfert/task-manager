import { toast } from "sonner"
import { tv } from "tailwind-variants"

import { CheckIcon } from "../assets/icons"
import { useGetWater, useUpdateWater } from "../hooks/data/use-water"

const WATER_OPTIONS = [
  { label: "500 ml", value: 500 },
  { label: "1 litro", value: 1000 },
  { label: "1.5 litros", value: 1500 },
  { label: "2 litros", value: 2000 },
  { label: "2.5 litros", value: 2500 },
]

const WATER_STEP = 500
const WATER_GOAL = 2500

const formatWater = (ml) => {
  if (ml < 1000) {
    return `${ml} ml`
  }
  const liters = ml / 1000
  return `${liters} ${liters === 1 ? "litro" : "litros"}`
}

const waterOption = tv({
  base: "flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition disabled:opacity-70",
  variants: {
    checked: {
      true: "bg-primary/15 text-dark-blue",
      false: "bg-dark-blue/5 text-dark-blue/80",
    },
  },
})

const waterCheckbox = tv({
  base: "flex h-5 w-5 items-center justify-center rounded-md",
  variants: {
    checked: {
      true: "bg-primary text-white",
      false: "bg-dark-blue/10",
    },
  },
})

const WaterCard = () => {
  const { data: water } = useGetWater()
  const { mutate: updateWater, isPending: isUpdatingWater } = useUpdateWater()

  const consumedWater = water?.consumed ?? 0

  const handleWaterOptionClick = (value) => {
    const newConsumed = consumedWater >= value ? value - WATER_STEP : value
    updateWater(newConsumed, {
      onError: () => {
        toast.error("Erro ao atualizar água")
      },
    })
  }

  return (
    <div className="space-y-6 rounded-xl bg-white p-6">
      <div>
        <h3>Água</h3>
        <span className="text-sm text-gray-500">
          Beba sua meta diária de água
        </span>
      </div>

      <div className="space-y-3">
        {WATER_OPTIONS.map((option) => {
          const checked = consumedWater >= option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleWaterOptionClick(option.value)}
              disabled={isUpdatingWater}
              className={waterOption({ checked })}
            >
              <span className={waterCheckbox({ checked })}>
                {checked && <CheckIcon className="h-4 w-4" />}
              </span>
              {option.label}
            </button>
          )
        })}
      </div>

      <p className="text-right text-sm font-bold text-primary">
        {formatWater(consumedWater)}
        <span className="text-text-gray">/{WATER_GOAL / 1000}L</span>
      </p>
    </div>
  )
}

export default WaterCard
