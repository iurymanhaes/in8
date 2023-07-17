import AppLayout from "@/components/Layout/Layout";
import { TransactionsProvider } from "@/contexts/Transactions/TransacionsProvider";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TransactionsProvider>
      <AppLayout>
        <Component {...pageProps} />
        <style jsx global>{`
          * {
            border: 0;
            margin: 0;
            box-sizing: border-box;
          }
        `}</style>
      </AppLayout>
    </TransactionsProvider>
  );
}
