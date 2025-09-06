import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

export function PolicyModal({ isOpen, onClose, type }: PolicyModalProps) {
  const getPolicyContent = () => {
    switch (type) {
      case 'howToBuy':
        return {
          title: 'How to Buy',
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Step-by-Step Buying Guide</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">1. Browse & Search</h4>
                  <p className="text-muted-foreground">Use our search feature or browse categories to find items you're interested in.</p>
                </div>
                <div>
                  <h4 className="font-medium">2. View Details</h4>
                  <p className="text-muted-foreground">Click on any product to see detailed information, photos, condition, and seller details.</p>
                </div>
                <div>
                  <h4 className="font-medium">3. Contact Seller</h4>
                  <p className="text-muted-foreground">Use the message feature to ask questions or negotiate prices directly with sellers.</p>
                </div>
                <div>
                  <h4 className="font-medium">4. Add to Cart</h4>
                  <p className="text-muted-foreground">Add items you want to purchase to your cart for easy checkout.</p>
                </div>
                <div>
                  <h4 className="font-medium">5. Secure Payment</h4>
                  <p className="text-muted-foreground">Complete your purchase using our secure payment system with buyer protection.</p>
                </div>
                <div>
                  <h4 className="font-medium">6. Arrange Pickup/Delivery</h4>
                  <p className="text-muted-foreground">Coordinate with the seller for item pickup or delivery as agreed.</p>
                </div>
              </div>
            </div>
          )
        };

      case 'safetyTips':
        return {
          title: 'Safety Tips',
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Stay Safe While Shopping</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-green-600">✓ Do:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Meet in public places for item exchanges</li>
                    <li>Inspect items carefully before purchasing</li>
                    <li>Use our secure messaging system</li>
                    <li>Check seller ratings and reviews</li>
                    <li>Keep transaction records</li>
                    <li>Trust your instincts - if something feels wrong, walk away</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600">✗ Don't:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Share personal banking or financial information</li>
                    <li>Meet at private residences for first transactions</li>
                    <li>Pay in advance without seeing the item</li>
                    <li>Use external payment methods</li>
                    <li>Rush into purchases without proper verification</li>
                  </ul>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-medium text-amber-800">Report Suspicious Activity</h4>
                  <p className="text-amber-700 text-sm">If you encounter suspicious behavior, fake listings, or fraudulent activities, please report them immediately to our support team.</p>
                </div>
              </div>
            </div>
          )
        };

      case 'paymentOptions':
        return {
          title: 'Payment Options',
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Secure Payment Methods</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Digital Payments</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>UPI (PhonePe, Google Pay, Paytm, BHIM)</li>
                    <li>Net Banking from all major banks</li>
                    <li>Credit & Debit Cards (Visa, MasterCard, RuPay)</li>
                    <li>Digital Wallets (Paytm, Amazon Pay, Mobikwik)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Cash on Delivery</h4>
                  <p className="text-muted-foreground">Pay in cash when you receive the item (available for select areas).</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800">Buyer Protection</h4>
                  <p className="text-blue-700 text-sm">All payments are secured with 256-bit SSL encryption. We offer purchase protection and dispute resolution for added safety.</p>
                </div>
                <div>
                  <h4 className="font-medium">Transaction Fees</h4>
                  <p className="text-muted-foreground">No additional fees for buyers. Sellers pay a small commission only when items are sold successfully.</p>
                </div>
              </div>
            </div>
          )
        };

      case 'returnPolicy':
        return {
          title: 'Return Policy',
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Return & Refund Policy</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Return Window</h4>
                  <p className="text-muted-foreground">Items can be returned within 7 days of purchase if they don't match the description or have undisclosed defects.</p>
                </div>
                <div>
                  <h4 className="font-medium">Eligible Returns</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Item significantly different from description</li>
                    <li>Undisclosed damage or defects</li>
                    <li>Wrong item received</li>
                    <li>Non-functional items sold as working</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Non-Returnable Items</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Items damaged by buyer after purchase</li>
                    <li>Change of mind (unless seller agrees)</li>
                    <li>Items correctly described with disclosed wear</li>
                    <li>Digital or downloaded content</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Return Process</h4>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Contact our support team within 7 days</li>
                    <li>Provide photos and description of the issue</li>
                    <li>Our team will mediate between buyer and seller</li>
                    <li>Return item in original condition (if required)</li>
                    <li>Refund processed within 5-7 business days</li>
                  </ol>
                </div>
              </div>
            </div>
          )
        };

      case 'listItem':
        return {
          title: 'List an Item',
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">How to Sell on Remarket</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Getting Started</h4>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Create a seller account or upgrade your existing account</li>
                    <li>Complete your profile with accurate information</li>
                    <li>Verify your phone number and email address</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium">Creating a Listing</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Take high-quality photos from multiple angles</li>
                    <li>Write clear, detailed descriptions</li>
                    <li>Set fair pricing based on condition</li>
                    <li>Choose appropriate category and condition</li>
                    <li>Add your location for local buyers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Best Practices</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Respond to messages promptly</li>
                    <li>Be honest about item condition</li>
                    <li>Package items securely</li>
                    <li>Maintain good communication</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">Seller Benefits</h4>
                  <p className="text-green-700 text-sm">Reach thousands of buyers, secure payments, seller protection, and build your reputation in our trusted community.</p>
                </div>
              </div>
            </div>
          )
        };

      case 'sellingTips':
        return {
          title: 'Selling Tips',
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Maximize Your Sales Success</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Photography Tips</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Use natural lighting when possible</li>
                    <li>Show the item from multiple angles</li>
                    <li>Highlight any flaws or wear honestly</li>
                    <li>Use a clean, uncluttered background</li>
                    <li>Include size references (coins, rulers)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Writing Great Descriptions</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Include brand, model, and specifications</li>
                    <li>Mention purchase date and usage history</li>
                    <li>Describe condition honestly and thoroughly</li>
                    <li>Include keywords buyers might search for</li>
                    <li>Explain why you're selling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Pricing Strategies</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Research similar items on the platform</li>
                    <li>Consider item age, condition, and demand</li>
                    <li>Price slightly higher to allow negotiation</li>
                    <li>Update prices if items don't sell quickly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Communication Excellence</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Respond to inquiries within 24 hours</li>
                    <li>Be friendly and professional</li>
                    <li>Provide additional photos if requested</li>
                    <li>Be flexible with viewing arrangements</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        };

      case 'pricingGuide':
        return {
          title: 'Pricing Guide',
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">How to Price Your Items</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Research Market Value</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Check current listings for similar items</li>
                    <li>Look at sold listings to see actual selling prices</li>
                    <li>Consider retail price and age of item</li>
                    <li>Factor in brand reputation and demand</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Condition-Based Pricing</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Like New:</span>
                      <span className="text-muted-foreground">70-85% of retail price</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Excellent:</span>
                      <span className="text-muted-foreground">55-70% of retail price</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Very Good:</span>
                      <span className="text-muted-foreground">40-55% of retail price</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Good:</span>
                      <span className="text-muted-foreground">25-40% of retail price</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Fair:</span>
                      <span className="text-muted-foreground">15-25% of retail price</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Category-Specific Tips</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li><strong>Electronics:</strong> Depreciate quickly, consider age and specs</li>
                    <li><strong>Furniture:</strong> Focus on condition and style trends</li>
                    <li><strong>Clothing:</strong> Brand, condition, and current fashion relevance</li>
                    <li><strong>Antiques:</strong> Research authenticity and collector demand</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800">Pro Tip</h4>
                  <p className="text-blue-700 text-sm">Start with a competitive price to attract buyers quickly. Items that sell within the first week often get better prices than those that sit for months.</p>
                </div>
              </div>
            </div>
          )
        };

      case 'sellerProtection':
        return {
          title: 'Seller Protection',
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">We Protect Our Sellers</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Payment Security</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Secure escrow service holds buyer payments</li>
                    <li>Payments released after buyer confirms receipt</li>
                    <li>Protection against payment fraud and chargebacks</li>
                    <li>Automatic dispute resolution process</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Identity Verification</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>All buyers must verify their accounts</li>
                    <li>Phone number and email verification required</li>
                    <li>Suspicious accounts are flagged and reviewed</li>
                    <li>Community reporting system for bad actors</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Dispute Resolution</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Dedicated support team for seller issues</li>
                    <li>Evidence-based dispute resolution process</li>
                    <li>Seller-friendly policies for legitimate transactions</li>
                    <li>Protection against unreasonable return requests</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">What's Covered</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Non-payment by verified buyers</li>
                    <li>False claims about item condition</li>
                    <li>Buyer attempts to return different items</li>
                    <li>Fraudulent damage claims</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">24/7 Support</h4>
                  <p className="text-green-700 text-sm">Our seller protection team is available around the clock to help resolve any issues and protect your interests.</p>
                </div>
              </div>
            </div>
          )
        };

      case 'communityGuidelines':
        return {
          title: 'Community Guidelines',
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Building a Trusted Community</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Respect and Courtesy</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Treat all community members with respect</li>
                    <li>Use polite and professional language</li>
                    <li>Respect cultural and personal differences</li>
                    <li>No harassment, bullying, or discriminatory behavior</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Honest Trading</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Provide accurate descriptions and photos</li>
                    <li>Honor your commitments and agreements</li>
                    <li>Disclose any flaws or defects honestly</li>
                    <li>Price items fairly and reasonably</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Prohibited Items</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Illegal or stolen goods</li>
                    <li>Weapons, ammunition, or dangerous items</li>
                    <li>Counterfeit or replica items sold as authentic</li>
                    <li>Adult content or services</li>
                    <li>Prescription medications or medical devices</li>
                    <li>Live animals or animal products</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Platform Integrity</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>No spam or excessive posting</li>
                    <li>Don't create multiple accounts</li>
                    <li>No artificial price manipulation</li>
                    <li>Report suspicious or fraudulent activity</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-800">Violations</h4>
                  <p className="text-red-700 text-sm">Violations of community guidelines may result in warnings, listing removal, account suspension, or permanent bans depending on severity.</p>
                </div>
              </div>
            </div>
          )
        };

      case 'privacyPolicy':
        return {
          title: 'Privacy Policy',
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Your Privacy Matters</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground text-sm">Last updated: January 2025</p>
                </div>
                <div>
                  <h4 className="font-medium">Information We Collect</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Account information (name, email, phone number)</li>
                    <li>Profile information and preferences</li>
                    <li>Transaction and payment data</li>
                    <li>Communication messages between users</li>
                    <li>Device and usage information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">How We Use Your Information</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Facilitate transactions between buyers and sellers</li>
                    <li>Verify user identity and prevent fraud</li>
                    <li>Provide customer support and resolve disputes</li>
                    <li>Improve our services and user experience</li>
                    <li>Send important updates and notifications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Information Sharing</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>We never sell your personal data to third parties</li>
                    <li>Limited sharing with verified buyers/sellers for transactions</li>
                    <li>Compliance with legal requirements when necessary</li>
                    <li>Service providers who help us operate the platform</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Your Rights</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Access and update your personal information</li>
                    <li>Delete your account and associated data</li>
                    <li>Control communication preferences</li>
                    <li>Request data portability</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Data Security</h4>
                  <p className="text-muted-foreground">We use industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your information.</p>
                </div>
                <div>
                  <h4 className="font-medium">Contact Us</h4>
                  <p className="text-muted-foreground">For privacy-related questions or concerns, contact us at privacy@remarket.com or through our support system.</p>
                </div>
              </div>
            </div>
          )
        };

      default:
        return {
          title: 'Information',
          content: <p>Content not available.</p>
        };
    }
  };

  const { title, content } = getPolicyContent();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {type === 'privacyPolicy' ? 'Learn how we collect, use, and protect your personal information.' :
             type === 'communityGuidelines' ? 'Guidelines for maintaining a safe and respectful marketplace community.' :
             type === 'returnPolicy' ? 'Understand our return and refund policies for purchases.' :
             'Important information about our marketplace policies and procedures.'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-6">
          {content}
        </ScrollArea>
        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}