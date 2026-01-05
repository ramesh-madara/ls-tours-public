import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, Star, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneNumberInput } from '@/components/ui/PhoneNumberInput';
import ItineraryDayCard from '@/components/packages/ItineraryDayCard';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchPackages } from '@/store/thunks/packagesThunks';
import { usePageTitle } from '@/hooks/usePageTitle';

const WHATSAPP_NUMBER = '94781229308';

const PackageDetail = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.packages);
  
  const pkg = items.find((p) => p.slug === slug);
  
  usePageTitle(pkg ? `${pkg.title} | LS Tours` : 'Package Details | LS Tours');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pax: '',
    travelDate: '',
  });
  const [errors, setErrors] = useState<{ email?: string; pax?: string }>({});

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPackages());
  }, [dispatch, status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; pax?: string } = {};
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.pax && (isNaN(Number(formData.pax)) || Number(formData.pax) < 1)) {
      newErrors.pax = 'Pax must be at least 1';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReserve = () => {
    if (!pkg || !validateForm()) return;

    // Build itinerary topics
    const itineraryTopics = pkg.itineraryDays
      .map(day => `Day ${day.day}: ${day.title}`)
      .join('\n');

    // Build message with only filled fields
    let message = `LS Tours - Trip Reservation Request\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Package: ${pkg.title}\n`;
    message += `Price: $${pkg.priceFromUSD} per person\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

    if (formData.name) message += `Name: ${formData.name}\n`;
    if (formData.email) message += `Email: ${formData.email}\n`;
    if (formData.phone) message += `Phone/WhatsApp: ${formData.phone}\n`;
    if (formData.pax) message += `Pax: ${formData.pax}\n`;
    if (formData.travelDate) message += `Approx Date: ${formData.travelDate}\n`;

    message += `\nItinerary Topics:\n${itineraryTopics}`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  if (status === 'loading') {
    return <div className="container py-20"><div className="h-96 bg-muted animate-pulse rounded-2xl" /></div>;
  }

  if (!pkg) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Package not found</h1>
        <Button asChild><Link to="/packages">Back to Packages</Link></Button>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img src={pkg.heroImage} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container pb-8">
          <Badge className="mb-4">{pkg.travelStyle === 'mid' ? 'Mid-Range' : pkg.travelStyle}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{pkg.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{pkg.durationDays}D/{pkg.durationNights}N</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{pkg.regions.join(', ')}</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" />{pkg.rating} ({pkg.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      <div className="container mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground">{pkg.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Highlights</h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {pkg.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" />{h}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Day-by-Day Itinerary</h2>
              <div className="space-y-4">
                {pkg.itineraryDays.map((day) => (
                  <ItineraryDayCard
                    key={day.day}
                    day={day}
                    dayNumber={day.day}
                    totalDays={pkg.durationDays}
                    packageImages={pkg.images}
                    packageInterests={pkg.interests}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="text-4xl font-bold text-primary mb-1">${pkg.priceFromUSD}</p>
              <p className="text-sm text-muted-foreground mb-5">per person</p>
              
              {/* Mini Form */}
              <div className="space-y-3 mb-5">
                <div>
                  <Label htmlFor="name" className="text-xs text-muted-foreground">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="h-9 text-sm"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone / WhatsApp Number</Label>
                  <PhoneNumberInput
                    name="phone"
                    value={formData.phone}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                    placeholder="Phone number"
                    inputClassName="h-9 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="pax" className="text-xs text-muted-foreground">Pax</Label>
                    <Input
                      id="pax"
                      name="pax"
                      type="number"
                      min="1"
                      value={formData.pax}
                      onChange={handleInputChange}
                      placeholder="2"
                      className="h-9 text-sm"
                    />
                    {errors.pax && <p className="text-xs text-destructive mt-1">{errors.pax}</p>}
                  </div>
                  <div>
                    <Label htmlFor="travelDate" className="text-xs text-muted-foreground">Travel Date</Label>
                    <Input
                      id="travelDate"
                      name="travelDate"
                      type="date"
                      value={formData.travelDate}
                      onChange={handleInputChange}
                      className="h-9 text-sm"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleReserve} className="w-full" size="lg">
                Reserve This Trip
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                We'll receive your request via WhatsApp.
              </p>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Inclusions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {pkg.inclusions.slice(0, 5).map((i, idx) => <li key={idx}>• {i}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><X className="h-4 w-4 text-destructive" />Exclusions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {pkg.exclusions.slice(0, 4).map((e, idx) => <li key={idx}>• {e}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
