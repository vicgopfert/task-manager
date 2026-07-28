import { toast } from "sonner"

import { useGetWater, useUpdateWater } from "../hooks/data/use-water"
import WaterItem from "./WaterItem"

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

const WaterCard = () => {
  const { data: water } = useGetWater()
  const { mutate: updateWater, isPending: isUpdatingWater } = useUpdateWater()

  const consumedWater = water?.consumed ?? 0

  const handleCheckboxClick = (value) => {
    const newConsumed = consumedWater >= value ? value - WATER_STEP : value
    updateWater(newConsumed, {
      onSuccess: () => {
        toast.success("Água atualizada com sucesso")
      },
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
        {WATER_OPTIONS.map((option) => (
          <WaterItem
            key={option.value}
            label={option.label}
            checked={consumedWater >= option.value}
            disabled={isUpdatingWater}
            onClick={() => handleCheckboxClick(option.value)}
          />
        ))}
      </div>

      <p className="text-right text-sm font-bold text-primary">
        {formatWater(consumedWater)}
        <span className="text-text-gray">/{WATER_GOAL / 1000}L</span>
      </p>
    </div>
  )
}

export default WaterCard
