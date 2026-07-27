const DashboardCard = ({ icon, info, description }) => {
  return (
    <div className="flex h-37.5 flex-col items-center justify-center gap-1 rounded-[10px] bg-white">
      <div className="flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        <p className="text-2xl font-bold text-dark-blue">{info}</p>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}

export default DashboardCard
