import type { AllOrderService, Service } from "../types";

export function mostRequestedService(
  allOrderService: AllOrderService[],
): [string, Service[]] | null {
  const services = allOrderService.reduce<Service[]>((acc, os) => {
    return [...acc, ...os.services.map((item) => item.service)];
  }, []);

  const servicesGrouped = services.reduce<Record<string, Service[]>>(
    (acc, service) => {
      const key = service.name;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(service);

      return acc;
    },
    {},
  );

  const entries = Object.entries(servicesGrouped);

  return entries.length > 0
    ? entries.reduce((max, current) =>
        current[1].length > max[1].length ? current : max,
      )
    : null;
}
