import AppShell from '../../components/layout/AppShell.js'
import Badge from '../../components/ui/Badge.js'
import Card from '../../components/ui/Card.js'

const dashboardMetrics = [
  { label: 'Total student leads', value: '0', tone: 'brand' },
  { label: 'New leads today', value: '0', tone: 'success' },
  { label: 'Awaiting assignment', value: '0', tone: 'warning' },
  { label: 'Active conversations', value: '0', tone: 'neutral' },
] as const

const DashboardPage = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-[#6B7280]">Dashboard</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-normal text-[#111827]">
            Operations overview
          </h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <Card className="p-5" key={metric.label}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">{metric.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-normal text-[#111827]">
                    {metric.value}
                  </p>
                </div>
                <Badge tone={metric.tone}>Live</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}

export default DashboardPage
