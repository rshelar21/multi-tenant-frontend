import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  return (
    <div className="my-10 flex flex-col gap-10 px-10">
      <Button variant="elevated">this is button</Button>
      <Input placeholder="this is input" />
      <Progress value={50} />
      <Textarea placeholder="this is textarea" />
      <Checkbox />
    </div>
  );
}
