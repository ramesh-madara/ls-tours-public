import { SectionHeader } from '@/components/ui/SectionHeader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { usePageTitle } from '@/hooks/usePageTitle';

const faqs = [
  { q: 'What is the best time to visit Sri Lanka?', a: 'The best time depends on which region you visit. The west and south coasts are ideal from December to April, while the east coast is best from May to September.' },
  { q: 'Do I need a visa to visit Sri Lanka?', a: 'Most nationalities need an Electronic Travel Authorization (ETA). We can assist with the application process as part of our service.' },
  { q: 'How far in advance should I book?', a: 'We recommend booking at least 2-3 months in advance, especially during peak season (December-March) to secure the best accommodations.' },
  { q: 'Are your tours customizable?', a: 'Absolutely! All our packages can be tailored to your preferences, pace, and interests. Just let us know your requirements.' },
  { q: 'What is included in the tour price?', a: 'Our packages typically include accommodation, private transportation, English-speaking guide, entrance fees, and meals as specified in each itinerary.' },
  { q: 'Is Sri Lanka safe for tourists?', a: 'Yes, Sri Lanka is generally very safe for tourists. Our team ensures all arrangements meet high safety standards and we provide 24/7 support during your trip.' },
];

const FAQ = () => {
  usePageTitle('FAQ | LS Tours');
  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <SectionHeader title="Frequently Asked Questions" subtitle="Everything you need to know about traveling with us" />
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
