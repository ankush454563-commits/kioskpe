import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string;
}

export default function ServiceCard({ icon: Icon, title, description, link }: ServiceCardProps) {
  const CardContent = (
    <div className="bg-white p-6 rounded-lg shadow-md card-hover border border-gray-100">
      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
        <Icon className="text-primary" size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {link && (
        <span className="text-primary font-semibold mt-4 inline-block">
          Learn More →
        </span>
      )}
    </div>
  );

  if (link) {
    return <Link href={link}>{CardContent}</Link>;
  }

  return CardContent;
}
