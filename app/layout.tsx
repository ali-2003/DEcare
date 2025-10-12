import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import '../styles/custom.css';

export const metadata: Metadata = {
  title: 'Dr. Sana Meah, DO - Diabetes & Endocrinology Care',
  description: 'Board Certified Endocrinologist specializing in Diabetes, Thyroid Disorders, and Metabolic Health in Oak Brook, IL',
  keywords: 'diabetes, endocrinology, Oak Brook, thyroid, endocrinologist, Dr. Sana Meah',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}