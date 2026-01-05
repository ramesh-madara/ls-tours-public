import { motion } from 'framer-motion';
import { Car, User, Building, Plane, FileText, Binoculars, Anchor, Train } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { services } from '@/lib/mockData';
import { usePageTitle } from '@/hooks/usePageTitle';

const iconMap: Record<string, React.ReactNode> = {
  car: <Car className="h-10 w-10" />,
  user: <User className="h-10 w-10" />,
  building: <Building className="h-10 w-10" />,
  plane: <Plane className="h-10 w-10" />,
  'file-text': <FileText className="h-10 w-10" />,
  binoculars: <Binoculars className="h-10 w-10" />,
  anchor: <Anchor className="h-10 w-10" />,
  train: <Train className="h-10 w-10" />,
};

const Services = () => {
  usePageTitle('Services | LS Tours');
  return (
    <div className="py-12">
      <div className="container">
        <SectionHeader
          title="Our Services"
          subtitle="Everything you need for a seamless Sri Lankan journey"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <ul className="text-sm space-y-1">
                {service.features.map((f, idx) => (
                  <li key={idx} className="text-muted-foreground">• {f}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
