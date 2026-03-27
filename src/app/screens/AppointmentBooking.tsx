import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, Calendar as CalendarIcon, Clock, MapPin, MessageSquare, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Calendar } from '../components/ui/calendar';

export function AppointmentBooking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    purpose: 'showflat',
    date: new Date('2026-03-28'),
    time: '14:00',
    fullName: '',
    mobile: '+65 ',
    email: '',
    language: 'English',
    notes: '',
    agreedToTerms: false,
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const purposes = [
    {
      id: 'showflat',
      icon: '🏠',
      title: 'Visit Showflat',
      description: 'Walk through the show unit in person (est. 45 min)',
    },
    {
      id: 'virtual',
      icon: '💻',
      title: 'Virtual Consultation',
      description: 'Video call with a sales consultant (est. 30 min)',
    },
    {
      id: 'financial',
      icon: '💰',
      title: 'Financial Consultation',
      description: 'Discuss loan, CPF, and payment options (est. 45 min)',
    },
  ];

  const timeSlots = {
    morning: ['10:00', '10:30', '11:00', '11:30'],
    afternoon: ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'],
    evening: ['18:00', '18:30', '19:00'],
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleAddToCalendar = () => {
    // In real app, would generate ICS file
    alert('Calendar event would be downloaded');
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
          <h1 className="text-base font-semibold">Booking Confirmed</h1>
        </header>

        <div className="px-4 py-8 text-center">
          <div className="w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-[#10B981]" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>

          <div className="bg-white rounded-2xl p-6 my-6 border border-gray-200 text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <CalendarIcon className="w-5 h-5 text-[#01696F]" />
                <span>Saturday, 28 Mar 2026</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-[#01696F]" />
                <span>2:00 PM</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-[#01696F]" />
                <span>Showflat at 123 Marine Parade Rd</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Your consultant:</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#01696F] flex items-center justify-center text-white font-semibold">
                  ST
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Tan</p>
                  <p className="text-sm text-gray-600">+65 9123 4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleAddToCalendar}
              variant="outline"
              className="w-full h-12 border-[#01696F] text-[#01696F] font-semibold rounded-xl"
            >
              📅 Add to Calendar
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 border-[#01696F] text-[#01696F] font-semibold rounded-xl"
            >
              💬 WhatsApp Consultant
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 border-[#01696F] text-[#01696F] font-semibold rounded-xl"
            >
              🗺 Get Directions
            </Button>
            <p className="text-sm text-gray-500 py-2">📧 Email Confirmation Sent</p>
          </div>

          <Button
            onClick={() => navigate('/')}
            className="w-full mt-6 h-12 bg-[#01696F] hover:bg-[#0C4E54] rounded-xl font-semibold"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold ml-2">Book an Appointment</h1>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-center gap-2">
          <div className={`flex items-center ${step >= 1 ? 'text-[#01696F]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
              step >= 1 ? 'bg-[#01696F] text-white' : 'bg-gray-200'
            }`}>
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <span className="ml-2 text-sm font-medium">Purpose</span>
          </div>
          <div className="w-8 h-px bg-gray-300 mx-2" />
          <div className={`flex items-center ${step >= 2 ? 'text-[#01696F]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
              step >= 2 ? 'bg-[#01696F] text-white' : 'bg-gray-200'
            }`}>
              {step > 2 ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <span className="ml-2 text-sm font-medium">Date/Time</span>
          </div>
          <div className="w-8 h-px bg-gray-300 mx-2" />
          <div className={`flex items-center ${step >= 3 ? 'text-[#01696F]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
              step >= 3 ? 'bg-[#01696F] text-white' : 'bg-gray-200'
            }`}>
              3
            </div>
            <span className="ml-2 text-sm font-medium">Confirm</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Step 1: Choose Purpose */}
        {step === 1 && (
          <div className="space-y-3">
            {purposes.map((purpose) => (
              <button
                key={purpose.id}
                onClick={() => setFormData({ ...formData, purpose: purpose.id })}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                  formData.purpose === purpose.id
                    ? 'border-[#01696F] bg-[#01696F]/5'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{purpose.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{purpose.title}</h3>
                    <p className="text-sm text-gray-600">{purpose.description}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.purpose === purpose.id
                      ? 'border-[#01696F] bg-[#01696F]'
                      : 'border-gray-300'
                  }`}>
                    {formData.purpose === purpose.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </button>
            ))}

            <Button
              onClick={() => setStep(2)}
              className="w-full mt-6 h-12 bg-[#01696F] hover:bg-[#0C4E54] rounded-xl font-semibold"
            >
              Next →
            </Button>
          </div>
        )}

        {/* Step 2: Pick Date & Time */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => date && setFormData({ ...formData, date })}
                disabled={(date) => date < new Date()}
                className="mx-auto"
              />
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Select Time Slot</h3>
              <div className="space-y-4">
                {Object.entries(timeSlots).map(([period, slots]) => (
                  <div key={period}>
                    <p className="text-sm text-gray-600 mb-2 capitalize">{period}</p>
                    <div className="grid grid-cols-4 gap-2">
                      {slots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setFormData({ ...formData, time })}
                          className={`py-2 text-sm font-medium rounded-lg border transition-colors ${
                            formData.time === time
                              ? 'bg-[#01696F] text-white border-[#01696F]'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-[#01696F]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setStep(3)}
              className="w-full h-12 bg-[#01696F] hover:bg-[#0C4E54] rounded-xl font-semibold"
            >
              Next →
            </Button>
          </div>
        )}

        {/* Step 3: Your Details */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-200 space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Tan"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="+65 91234567"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.tan@email.com"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="language">Preferred Language</Label>
                <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Malay">Malay</SelectItem>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes to Consultant (optional)</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special requirements or questions..."
                  className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01696F] min-h-[80px]"
                />
              </div>

              <label className="flex items-start gap-2">
                <Checkbox
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: checked as boolean })}
                  className="mt-0.5"
                />
                <span className="text-sm text-gray-600">
                  I agree to the Privacy Policy and Terms
                </span>
              </label>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={!formData.agreedToTerms || !formData.fullName || !formData.email}
              className="w-full h-12 bg-[#01696F] hover:bg-[#0C4E54] rounded-xl font-semibold disabled:opacity-50"
            >
              Confirm Booking
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
