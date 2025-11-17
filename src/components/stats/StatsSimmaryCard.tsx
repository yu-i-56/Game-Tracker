import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StatsSimmaryCardProps = {
  title: string;
  value: number;
  description: string;
  format?: "number" | "time" | "decimal";
};

export function StatsSimmaryCard({
  title,
  value,
  description,
  format = "number",
}: StatsSimmaryCardProps) {
  const formatedValue = (value: number) => {
    switch (format) {
      case "number":
        return value.toLocaleString();
      case "time":
        const hours = Math.floor(value / 60);
        const minutes = value % 60;

        if (hours > 0) {
          return `${hours}h ${minutes}m`;
        } else {
          return `${minutes}m`;
        }
      case "decimal":
        return value.toFixed(1);
      default:
        return value.toLocaleString();
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-4 items-center justify-between">
        <p>{formatedValue(value)}</p>
      </CardContent>
    </Card>
  );
}
