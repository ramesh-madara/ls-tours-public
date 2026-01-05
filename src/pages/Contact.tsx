import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PhoneNumberInput } from '@/components/ui/PhoneNumberInput';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { usePageTitle } from '@/hooks/usePageTitle';

const Contact = () => {
  usePageTitle('Contact | LS Tours');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDates: '',
    pax: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendWhatsApp = () => {
    let message = `LS Tours - Quote Request\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    if (formData.name) message += `Name: ${formData.name}\n`;
    if (formData.email) message += `Email: ${formData.email}\n`;
    if (formData.phone) message += `Phone/WhatsApp: ${formData.phone}\n`;
    if (formData.travelDates) message += `Travel Dates: ${formData.travelDates}\n`;
    if (formData.pax) message += `Pax: ${formData.pax}\n`;
    if (formData.message) message += `Message: ${formData.message}\n`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/94781229308?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <div className="py-12">
      <div className="container">
        <SectionHeader title="Get a Quote" subtitle="Let's plan your perfect Sri Lankan adventure" />
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-4 mb-8">
              <a href="tel:+94771234567" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-5 w-5" /> +94 77 123 4567
              </a>
              <a href="mailto:hello@lstours.lk" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" /> hello@lstours.lk
              </a>
              <p className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5" /> 42 Galle Road, Colombo 03, Sri Lanka
              </p>
            </div>
            
            <div className="bg-muted rounded-2xl p-6">
              <h4 className="font-semibold mb-2">Office Hours</h4>
              <p className="text-muted-foreground text-sm">Monday - Saturday: 9:00 AM - 6:00 PM (Sri Lanka Time)</p>
              <p className="text-muted-foreground text-sm">Sunday: Closed</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl p-6 shadow-card space-y-4"
          >
            <p className="text-sm text-muted-foreground mb-2">All fields are optional.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input 
                name="name" 
                placeholder="Your Name" 
                value={formData.name} 
                onChange={handleChange} 
              />
              <Input 
                name="email" 
                type="email" 
                placeholder="Email Address" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <PhoneNumberInput
                name="phone"
                placeholder="Phone / WhatsApp Number"
                value={formData.phone}
                onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
              />
              <p className="text-xs text-muted-foreground mt-1">Enter any number you prefer for contact (WhatsApp recommended)</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input 
                name="travelDates" 
                placeholder="Travel Dates (approximate)" 
                value={formData.travelDates} 
                onChange={handleChange} 
              />
              <Input 
                name="pax" 
                type="number" 
                placeholder="Number of Travelers" 
                value={formData.pax} 
                onChange={handleChange} 
              />
            </div>
            <Textarea 
              name="message" 
              placeholder="Tell us about your dream trip..." 
              rows={4} 
              value={formData.message} 
              onChange={handleChange} 
            />
            <Button onClick={handleSendWhatsApp} className="w-full" size="lg">
              <Send className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
