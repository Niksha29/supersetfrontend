
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface MessageCardProps {
  title: string;
  content: string;
  date: Date;
  author: string;
}

export const MessageCard = ({ title, content, date, author }: MessageCardProps) => {
  return (
    <Card className="overflow-hidden bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="flex justify-between">
          <span>Posted by {author}</span>
          <span>{formatDistanceToNow(date, { addSuffix: true })}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
};
