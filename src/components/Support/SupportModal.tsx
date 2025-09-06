import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Shield, 
  CreditCard, 
  Package, 
  User,
  Clock,
  CheckCircle
} from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

export function SupportModal({ isOpen, onClose, user }: SupportModalProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const supportCategories = [
    { id: 'account', label: 'Account Issues', icon: User },
    { id: 'payment', label: 'Payment & Billing', icon: CreditCard },
    { id: 'orders', label: 'Order Support', icon: Package },
    { id: 'safety', label: 'Safety & Trust', icon: Shield },
    { id: 'technical', label: 'Technical Issues', icon: FileText },
    { id: 'other', label: 'Other', icon: MessageCircle }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate support ticket submission
    const ticketId = `RMK-${Date.now().toString().slice(-6)}`;
    toast.success(`🎫 Support ticket created: ${ticketId}`, {
      description: 'We\'ll get back to you within 24 hours. Check your email for updates.',
    });

    // Reset form
    setSelectedCategory('');
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      subject: '',
      message: '',
      priority: 'medium'
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Get Support
          </DialogTitle>
          <DialogDescription>
            Contact our support team for help with your account, orders, or any questions you may have.
          </DialogDescription>
        </DialogHeader>

        {/* Quick Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Call Us</p>
              <p className="font-medium">+91 98765 43210</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">help@remarket.in</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Response Time</p>
              <p className="font-medium">&lt; 24 hours</p>
            </div>
          </div>
        </div>

        {/* Support Categories */}
        <div className="mb-6">
          <h3 className="mb-3">What can we help you with?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {supportCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCategory === category.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">{category.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Support Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Subject *</label>
            <Input
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Brief description of your issue"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Priority</label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Low</Badge>
                    <span>General questions</span>
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Medium</Badge>
                    <span>Account or order issues</span>
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">High</Badge>
                    <span>Payment or security issues</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm mb-2">Message *</label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Please provide as much detail as possible about your issue..."
              rows={5}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-2" />
              Submit Ticket
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>

        {/* FAQ Quick Links */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Frequently Asked Questions
          </h4>
          <div className="space-y-2 text-sm">
            <p className="cursor-pointer text-primary hover:underline">
              • How do I reset my password?
            </p>
            <p className="cursor-pointer text-primary hover:underline">
              • What payment methods do you accept?
            </p>
            <p className="cursor-pointer text-primary hover:underline">
              • How do I report a suspicious listing?
            </p>
            <p className="cursor-pointer text-primary hover:underline">
              • How does the seller verification work?
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}