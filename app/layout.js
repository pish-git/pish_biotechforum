import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

export const metadata = {
  title: "Передовая Инженерная Школа ДВФУ",
  description: "Передовая инженерная школа Дальневосточного Федерального Университета, видеоуроки ПИШ и его интерактивный музей",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
