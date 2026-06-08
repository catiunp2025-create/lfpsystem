import { Injectable, StreamableFile } from "@nestjs/common";
import { OrderServiceRepository } from "src/domain/OrderServiceRepository";
import { OrderServiceNotFound } from "src/shared/erros/cases/OrderServiceNotFound";
import PDFDocument from "pdfkit";

interface Request {
    id: string;
}

@Injectable()
export class GeneratePdfOrderServiceUseCase {
    constructor(private readonly orderServiceRepository: OrderServiceRepository) {}

    async execute({ id }: Request): Promise<StreamableFile> {
        const orderService = await this.orderServiceRepository.findById({ id });
        if (!orderService) throw new OrderServiceNotFound();

        const buffer = await new Promise<Buffer>((resolve, reject) => {
            const doc = new PDFDocument({ margin: 40 });
            const chunks: Buffer[] = [];

            doc.on("data", (chunk) => chunks.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(chunks)));
            doc.on("error", reject);

            doc.fontSize(18).text("Ordem de Serviço", { align: "center" });
            doc.moveDown();

            doc.fontSize(11).text(`Data: ${new Date(orderService.date).toLocaleDateString("pt-BR")}`);
            doc.text(`Status: ${orderService.status}`);
            doc.moveDown();

            const customer = orderService.address.customer;
            doc.fontSize(13).text("Cliente", { underline: true });
            doc.fontSize(11).text(`Nome: ${customer.name}`);
            customer.contact.forEach((c) => {
                doc.text(`${c.type}: ${c.value}`);
            });
            doc.moveDown();

            const address = orderService.address;
            doc.fontSize(13).text("Endereço", { underline: true });
            doc.fontSize(11).text(
                `${address.street}, ${address.number}${address.complement ? " - " + address.complement : ""}`
            );
            doc.text(`${address.neighborhood} - ${address.city}/${address.state}`);
            doc.text(`CEP: ${address.postCode}`);
            doc.moveDown();

            doc.fontSize(13).text("Equipe", { underline: true });
            orderService.vehicleUsers.forEach(({ vehicleUser: vu }) => {
                doc.fontSize(11).text(`Funcionário: ${vu.user.name} (${vu.type})`);
            });
            const firstVu = orderService.vehicleUsers[0]?.vehicleUser;
            if (firstVu) {
                doc.fontSize(11).text(`Veículo: ${firstVu.vehicle.model} - ${firstVu.vehicle.plate}`);
            }
            doc.moveDown();

            doc.fontSize(13).text("Serviços", { underline: true });
            let total = 0;
            orderService.services.forEach(({ service }) => {
                doc.fontSize(11).text(`• ${service.name} — R$ ${service.value.toFixed(2)}`);
                total += service.value;
            });
            doc.moveDown();
            doc.fontSize(12).text(`Total: R$ ${total.toFixed(2)}`, { align: "right" });

            doc.end();
        });

        return new StreamableFile(buffer, {
            type: 'application/pdf',
            disposition: `attachment; filename="os-${id}.pdf"`,
        });
    }
}
