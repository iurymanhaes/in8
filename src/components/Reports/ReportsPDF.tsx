import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  PDFDownloadLink,
  
} from "@react-pdf/renderer";
import { Button } from "antd";
import React from "react";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    textDecoration: "underline",
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  tableRow: {
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
  },
  tableDateCell: {
    width: "30%",
  },
  tableValueCell: {
    width: "20%",
    textAlign: "right",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "right",
  },
  footerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

type Props = {
  transactions: Transaction[];
};

function ReportsPDFDocument({ transactions }: Props) {
  const total = transactions.reduce((acc, curr) => acc + parseFloat(curr.value), 0);
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Relatório</Text>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, styles.tableDateCell]}>
              Categoria
            </Text>
            <Text style={[styles.tableHeader, styles.tableDateCell]}>Data</Text>
            <Text style={[styles.tableHeader, styles.tableCell]}>
              Descrição
            </Text>
            <Text style={[styles.tableHeader, styles.tableValueCell]}>
              Valor
            </Text>
          </View>
          {transactions.length > 0 &&
            transactions.map((transaction: Transaction, index: number) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.tableDateCell]}>
                  {transaction.category}
                </Text>
                <Text style={[styles.tableCell, styles.tableDateCell]}>
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </Text>
                <Text style={styles.tableCell}>{transaction.description}</Text>
                <Text style={[styles.tableCell, styles.tableValueCell]}>
                  {parseFloat(transaction.value).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              </View>
            ))}
            <View style={styles.footer}>
            <Text style={styles.footerText}>
              Total:{" "}
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
export function ReportsPDF({ transactions }: Props) {
  return (
    <div>
      <PDFDownloadLink
        document={<ReportsPDFDocument transactions={transactions} />}
        fileName="relatorio.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? <div>Loading ...</div> : <Button>Gerar PDF</Button>
        }
      </PDFDownloadLink>
    </div>
  );
}
