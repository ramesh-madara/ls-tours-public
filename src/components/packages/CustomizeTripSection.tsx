import { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchDestinations } from "@/store/thunks/destinationsThunks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhoneNumberInput } from "@/components/ui/PhoneNumberInput";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CalendarIcon, X, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CustomizeTripSection = () => {
  const dispatch = useAppDispatch();
  const { items: destinations, status } = useAppSelector((state) => state.destinations);

  const [planName, setPlanName] = useState("");
  const [fullName, setFullName] = useState("");
  const [pax, setPax] = useState("");
  const [days, setDays] = useState("");
  const [preferredDate, setPreferredDate] = useState<Date | undefined>();
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialMessage, setSpecialMessage] = useState("");

  useEffect(() => {
    if (status === "idle") dispatch(fetchDestinations());
  }, [dispatch, status]);

  const toggleDestination = (destName: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(destName) ? prev.filter((d) => d !== destName) : [...prev, destName],
    );
  };

  const removeDestination = (destName: string) => {
    setSelectedDestinations((prev) => prev.filter((d) => d !== destName));
  };

  const handleSendWhatsApp = () => {
    let message = `LS Tours - Custom Trip Request\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    if (planName) message += `Plan Name: ${planName}\n`;
    if (fullName) message += `Name: ${fullName}\n`;
    if (pax) message += `Pax: ${pax}\n`;
    if (days) message += `Days: ${days}\n`;
    if (preferredDate) message += `Preferred Date: ${format(preferredDate, "PPP")}\n`;
    if (selectedDestinations.length > 0) message += `Destinations: ${selectedDestinations.join(", ")}\n`;
    if (phone) message += `Phone/WhatsApp: ${phone}\n`;
    if (email) message += `Email: ${email}\n`;
    if (specialMessage) message += `Message: ${specialMessage}\n`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/94781229308?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <section id="customize-trip" className="py-16 bg-muted/30">
      <div className="container">
        <SectionHeader title="Customize Your Trip" subtitle="Tell us what you like — we'll craft a plan for you." />

        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground text-center mb-8">
            All fields are optional. Fill in what you can, and we'll get back to you!
          </p>

          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plan Name */}
              <div className="space-y-2">
                <Label htmlFor="planName">Custom Plan Name</Label>
                <Input
                  id="planName"
                  placeholder="e.g., Family Adventure 2026"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                />
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Pax */}
              <div className="space-y-2">
                <Label htmlFor="pax">Number of Travelers</Label>
                <Input
                  id="pax"
                  type="number"
                  min="1"
                  placeholder="e.g., 4"
                  value={pax}
                  onChange={(e) => setPax(e.target.value)}
                />
              </div>

              {/* Days */}
              <div className="space-y-2">
                <Label htmlFor="days">Number of Days</Label>
                <Input
                  id="days"
                  type="number"
                  min="1"
                  placeholder="e.g., 7"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>

              {/* Preferred Date */}
              <div className="space-y-2">
                <Label>Preferred Travel Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !preferredDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {preferredDate ? format(preferredDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={preferredDate}
                      onSelect={setPreferredDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Phone / WhatsApp */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone / WhatsApp Number</Label>
                <PhoneNumberInput
                  name="phone"
                  placeholder="Phone number"
                  value={phone}
                  onChange={setPhone}
                />
                <p className="text-xs text-muted-foreground">Enter any number you prefer for contact (WhatsApp recommended)</p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Destinations Multi-select */}
            <div className="mt-6 space-y-3">
              <Label>Preferred Destinations</Label>

              {/* Selected chips */}
              {selectedDestinations.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedDestinations.map((dest) => (
                    <span
                      key={dest}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm"
                    >
                      {dest}
                      <button
                        type="button"
                        onClick={() => removeDestination(dest)}
                        className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                        aria-label={`Remove ${dest}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Destination options */}
              <div className="flex flex-wrap gap-2">
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => toggleDestination(dest.name)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm border transition-colors",
                      selectedDestinations.includes(dest.name)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary hover:text-primary",
                    )}
                  >
                    {dest.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Message */}
            <div className="mt-6 space-y-2">
              <Label htmlFor="specialMessage">Special Requests or Message</Label>
              <Textarea
                id="specialMessage"
                placeholder="Any special requirements, preferences, or questions..."
                rows={4}
                value={specialMessage}
                onChange={(e) => setSpecialMessage(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <Button size="lg" onClick={handleSendWhatsApp} className="gap-2 px-8">
                <MessageCircle className="h-5 w-5" />
                Send via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizeTripSection;
