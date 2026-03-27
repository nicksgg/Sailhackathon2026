import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Info, Upload, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';

export function EOISubmission() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'form' | 'submitted'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    nric: '',
    nationality: 'Singapore Citizen',
    dob: '',
    address: '',
    phone: '+65 ',
    email: '',
    preferredUnits: ['#12-03', '#10-05', ''],
    paymentMethod: 'Bank loan',
    loanAmount: '',
    documents: {
      nric: true,
      income: true,
      funds: false,
      optionFee: false,
    },
    declarations: {
      truthful: false,
      consent: false,
      nonBinding: false,
    },
  });

  const handleSubmit = () => {
    setStatus('submitted');
  };

  const timeline = [
    { label: 'Draft', completed: true, active: false },
    { label: 'Submitted', completed: status === 'submitted', active: status === 'submitted' },
    { label: 'Reviewed', completed: false, active: false },
    { label: 'Confirmed', completed: false, active: false },
  ];

  if (status === 'submitted') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-semibold">EOI Status</h1>
          <button className="p-2 -mr-2">
            <Info className="w-5 h-5 text-gray-500" />
          </button>
        </header>

        <div className="px-4 py-6">
          {/* Timeline */}
          <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              {timeline.map((item, index) => (
                <div key={item.label} className="flex-1 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    item.completed ? 'bg-[#01696F] text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {item.completed ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <p className="text-xs font-medium text-center">{item.label}</p>
                  {index < timeline.length - 1 && (
                    <div className={`absolute w-full h-0.5 top-5 -z-10 ${
                      item.completed ? 'bg-[#01696F]' : 'bg-gray-200'
                    }`} style={{ left: '50%', width: `${100 / timeline.length}%` }} />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Submitted: 27 Mar 2026, 3:15 PM</p>
              <p className="text-sm font-semibold text-gray-900">Reference: EOI-2026-0342</p>
            </div>
          </div>

          {/* Action Cards */}
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📄</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Upload Additional Docs</h3>
                  <p className="text-sm text-gray-600 mb-3">2 of 4 documents uploaded</p>
                  <Button variant="outline" size="sm" className="text-[#01696F] border-[#01696F]">
                    Upload remaining →
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📊</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Track EOI Status</h3>
                  <p className="text-sm text-gray-600 mb-1">Currently: Under Review</p>
                  <p className="text-sm text-gray-500">Est. response: 3 working days</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💬</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Contact Your Consultant</h3>
                  <p className="text-sm text-gray-600 mb-3">Sarah Tan</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Call</Button>
                    <Button variant="outline" size="sm">WhatsApp</Button>
                    <Button variant="outline" size="sm">Email</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">Expression of Interest</h1>
        <button className="p-2 -mr-2">
          <Info className="w-5 h-5 text-gray-500" />
        </button>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Purchaser Details */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-4">Purchaser Details</h2>
          <div className="space-y-4">
            <div>
              <Label>Full Legal Name (as per NRIC)</Label>
              <Input className="mt-1.5" placeholder="John Tan Wei Ming" />
            </div>
            <div>
              <Label>NRIC / Passport No.</Label>
              <Input className="mt-1.5" placeholder="S1234567A" />
            </div>
            <div>
              <Label>Nationality</Label>
              <Select defaultValue="Singapore Citizen">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Singapore Citizen">Singapore Citizen</SelectItem>
                  <SelectItem value="PR">Permanent Resident</SelectItem>
                  <SelectItem value="Foreigner">Foreigner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Input type="date" className="mt-1.5" />
            </div>
            <div>
              <Label>Contact Number</Label>
              <Input className="mt-1.5" placeholder="+65 91234567" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" className="mt-1.5" placeholder="john.tan@email.com" />
            </div>
          </div>
        </div>

        {/* Preferred Units */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-4">Preferred Units</h2>
          <div className="space-y-3">
            <div>
              <Label>1st Choice</Label>
              <Select defaultValue="#12-03">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="#12-03">#12-03 · 2BR · $1.98M</SelectItem>
                  <SelectItem value="#10-05">#10-05 · 2BR · $1.92M</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>2nd Choice</Label>
              <Select defaultValue="#10-05">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="#10-05">#10-05 · 2BR · $1.92M</SelectItem>
                  <SelectItem value="#12-03">#12-03 · 2BR · $1.98M</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-4">Required Documents</h2>
          <div className="space-y-3">
            {[
              { label: 'NRIC (front & back)', uploaded: true },
              { label: 'Proof of income (3 months)', uploaded: true },
              { label: 'Proof of funds / CPF statement', uploaded: false },
              { label: 'Option fee cheque / transfer', uploaded: false },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Checkbox checked={doc.uploaded} />
                  <span className="text-sm text-gray-700">{doc.label}</span>
                </div>
                {doc.uploaded ? (
                  <span className="text-xs text-green-600 font-medium">Uploaded ✓</span>
                ) : (
                  <button className="text-xs text-[#01696F] font-medium flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    Upload
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Declaration */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-4">Declaration</h2>
          <div className="space-y-3">
            <label className="flex items-start gap-2">
              <Checkbox className="mt-0.5" />
              <span className="text-sm text-gray-700">
                I declare that the information provided is true and accurate.
              </span>
            </label>
            <label className="flex items-start gap-2">
              <Checkbox className="mt-0.5" />
              <span className="text-sm text-gray-700">
                I consent to the collection and use of my personal data per the PDPA.
              </span>
            </label>
            <label className="flex items-start gap-2">
              <Checkbox className="mt-0.5" />
              <span className="text-sm text-gray-700">
                I understand this EOI is non-binding until the Option to Purchase is exercised.
              </span>
            </label>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full h-12 bg-[#01696F] hover:bg-[#0C4E54] rounded-xl font-semibold"
        >
          Submit EOI
        </Button>
      </div>
    </div>
  );
}
