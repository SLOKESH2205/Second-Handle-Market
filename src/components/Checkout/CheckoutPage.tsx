import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner@2.0.3';
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  Shield, 
  Check,
  ArrowLeft,
  Wallet,
  Building,
  Smartphone
} from 'lucide-react';

interface CheckoutPageProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  onOrderComplete: (orderData: any) => void;
}

export function CheckoutPage({ isOpen, onClose, cartItems, onOrderComplete }: CheckoutPageProps) {
  const [step, setStep] = useState(1); // 1: Delivery, 2: Payment, 3: Review
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    deliveryType: 'standard'
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharges = deliveryInfo.deliveryType === 'express' ? 150 : 50;
  const platformFee = 25;
  const total = subtotal + deliveryCharges + platformFee;

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      time: '3-5 business days',
      price: 50,
      icon: Truck
    },
    {
      id: 'express',
      name: 'Express Delivery',
      time: '1-2 business days',
      price: 150,
      icon: Truck
    }
  ];

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using Google Pay, PhonePe, Paytm',
      icon: Smartphone
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay',
      icon: CreditCard
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      description: 'Paytm, Amazon Pay, MobiKwik',
      icon: Wallet
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'All major banks supported',
      icon: Building
    }
  ];

  const handleDeliverySubmit = () => {
    if (!deliveryInfo.fullName || !deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.pincode) {
      toast.error('Please fill in all required delivery information');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = () => {
    if (paymentMethod === 'upi' && !paymentDetails.upiId) {
      toast.error('Please enter your UPI ID');
      return;
    }
    if (paymentMethod === 'card' && (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv)) {
      toast.error('Please fill in all card details');
      return;
    }
    setStep(3);
  };

  const handleOrderComplete = () => {
    const orderData = {
      orderId: `RM${Date.now().toString().slice(-8)}`,
      items: cartItems,
      delivery: deliveryInfo,
      payment: { method: paymentMethod },
      total: total,
      orderDate: new Date().toISOString(),
      estimatedDelivery: deliveryInfo.deliveryType === 'express' 
        ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    };

    onOrderComplete(orderData);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= stepNum ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            {step > stepNum ? <Check className="w-4 h-4" /> : stepNum}
          </div>
          <div className={`text-sm ml-2 ${step >= stepNum ? 'text-primary' : 'text-muted-foreground'}`}>
            {stepNum === 1 && 'Delivery'}
            {stepNum === 2 && 'Payment'}
            {stepNum === 3 && 'Review'}
          </div>
          {stepNum < 3 && <div className={`w-8 h-px mx-4 ${step > stepNum ? 'bg-primary' : 'bg-muted'}`} />}
        </div>
      ))}
    </div>
  );

  const renderDeliveryStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Delivery Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Full Name *"
            value={deliveryInfo.fullName}
            onChange={(e) => setDeliveryInfo(prev => ({ ...prev, fullName: e.target.value }))}
          />
          <Input
            placeholder="Phone Number *"
            value={deliveryInfo.phone}
            onChange={(e) => setDeliveryInfo(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        
        <Textarea
          placeholder="Complete Address *"
          className="mt-4"
          value={deliveryInfo.address}
          onChange={(e) => setDeliveryInfo(prev => ({ ...prev, address: e.target.value }))}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Input
            placeholder="City *"
            value={deliveryInfo.city}
            onChange={(e) => setDeliveryInfo(prev => ({ ...prev, city: e.target.value }))}
          />
          <Input
            placeholder="State"
            value={deliveryInfo.state}
            onChange={(e) => setDeliveryInfo(prev => ({ ...prev, state: e.target.value }))}
          />
          <Input
            placeholder="PIN Code *"
            value={deliveryInfo.pincode}
            onChange={(e) => setDeliveryInfo(prev => ({ ...prev, pincode: e.target.value }))}
          />
        </div>
        
        <Input
          placeholder="Landmark (Optional)"
          className="mt-4"
          value={deliveryInfo.landmark}
          onChange={(e) => setDeliveryInfo(prev => ({ ...prev, landmark: e.target.value }))}
        />
      </div>

      <div>
        <h4 className="mb-3">Delivery Options</h4>
        <div className="space-y-3">
          {deliveryOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card 
                key={option.id}
                className={`cursor-pointer transition-all ${
                  deliveryInfo.deliveryType === option.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setDeliveryInfo(prev => ({ ...prev, deliveryType: option.id }))}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-sm text-muted-foreground">{option.time}</p>
                      </div>
                    </div>
                    <p className="font-medium">₹{option.price}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Payment Method
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <Card
              key={method.id}
              className={`cursor-pointer transition-all ${
                paymentMethod === method.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setPaymentMethod(method.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {paymentMethod === 'upi' && (
        <div className="space-y-4">
          <Input
            placeholder="Enter UPI ID (e.g., user@paytm)"
            value={paymentDetails.upiId}
            onChange={(e) => setPaymentDetails(prev => ({ ...prev, upiId: e.target.value }))}
          />
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <Input
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="MM/YY"
              value={paymentDetails.expiryDate}
              onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
            />
            <Input
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value }))}
            />
          </div>
          <Input
            placeholder="Cardholder Name"
            value={paymentDetails.cardName}
            onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardName: e.target.value }))}
          />
        </div>
      )}
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <h3>Order Review</h3>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Delivery Address</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium">{deliveryInfo.fullName}</p>
          <p className="text-sm text-muted-foreground">{deliveryInfo.phone}</p>
          <p className="text-sm">{deliveryInfo.address}</p>
          <p className="text-sm">{deliveryInfo.city}, {deliveryInfo.state} - {deliveryInfo.pincode}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{paymentMethods.find(m => m.id === paymentMethod)?.name}</p>
          {paymentMethod === 'upi' && paymentDetails.upiId && (
            <p className="text-sm text-muted-foreground">{paymentDetails.upiId}</p>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <Shield className="w-4 h-4" />
        <span>Your order is protected by Remarket's Buyer Protection Policy</span>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(step - 1)}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            Checkout
          </DialogTitle>
          <DialogDescription>
            Complete your purchase securely with our 3-step checkout process.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {renderStepIndicator()}
            
            {step === 1 && renderDeliveryStep()}
            {step === 2 && renderPaymentStep()}
            {step === 3 && renderReviewStep()}

            <div className="flex gap-3 pt-6">
              {step === 1 && (
                <Button onClick={handleDeliverySubmit} className="flex-1">
                  Continue to Payment
                </Button>
              )}
              {step === 2 && (
                <Button onClick={handlePaymentSubmit} className="flex-1">
                  Review Order
                </Button>
              )}
              {step === 3 && (
                <Button onClick={handleOrderComplete} className="flex-1">
                  Place Order - ₹{total.toLocaleString('en-IN')}
                </Button>
              )}
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-base">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span>₹{deliveryCharges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}