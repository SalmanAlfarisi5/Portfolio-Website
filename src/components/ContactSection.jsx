
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [showMap, setShowMap] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('Sending…');

    const data = new FormData(e.target);
    data.append('access_key', 'f7d7ef7a-524d-4308-97c8-561b559bf08f');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        setResult('Form Submitted Successfully');
        e.target.reset();
        setFormData({ name: '', email: '', subject: '', message: '' });
        toast({
          title: 'Message sent!',
          description: 'Thank you for your message. I\'ll get back to you soon.',
          duration: 5000,
        });
      } else {
        setResult(json.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      setResult('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      value: 'salman26080@gmail.com',
      link: 'mailto:salman26080@gmail.com',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      value: '+65 8591 3654',
      link: 'tel:+6585913654',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Location',
      value: 'Singapore',
      link: null, // not a navigable destination — rendered as static info
    },
  ];

  const inputClasses = "w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  const cardClasses = "glass-card p-6 rounded-lg flex flex-col items-center text-center";

  return (
    <section id="contact" className="py-20 bg-secondary/20 relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
            I'm always open to new ideas and collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => {
            const inner = (
              <>
                <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                <p className="text-muted-foreground">{info.value}</p>
              </>
            );

            return info.link ? (
              <motion.a
                key={index}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${cardClasses} hover:bg-secondary/50 transition-colors`}
              >
                {inner}
              </motion.a>
            ) : (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cardClasses}
              >
                {inner}
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="sr-only">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    autoComplete="name"
                    required
                    className={inputClasses}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">Your Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    autoComplete="email"
                    required
                    className={inputClasses}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="sr-only">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className={inputClasses}
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">Your Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  required
                  className={inputClasses}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <Button
                type="submit"
                size="lg"
                className="rounded-full w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    Sending...
                    <svg className="animate-spin ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
              {result && (
                <p className="sr-only" role="status" aria-live="polite">{result}</p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <div className="glass-card rounded-lg p-1 h-full min-h-[320px]">
              <div className="bg-background rounded-md overflow-hidden h-full w-full">
                {showMap ? (
                  <iframe
                    title="Map showing National University of Singapore"
                    src="https://www.google.com/maps?q=National%20University%20of%20Singapore&z=11&output=embed"
                    className="w-full h-full min-h-[320px] rounded-md border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowMap(true)}
                    className="group w-full h-full min-h-[320px] flex flex-col items-center justify-center gap-3 text-center p-6 hover:bg-secondary/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                    aria-label="Load interactive map of National University of Singapore"
                  >
                    <span className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      <MapPin className="h-6 w-6" />
                    </span>
                    <span className="font-medium">National University of Singapore</span>
                    <span className="text-sm text-muted-foreground">Click to load the interactive map</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
