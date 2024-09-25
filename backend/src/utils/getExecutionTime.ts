export const getExecutionTime = (
  startTime: number,
  actionDescription: string,
): void => {
  const endTime = Date.now();
  const executionTimeInSeconds = (endTime - startTime) / 1000;
  console.log(
    `O tempo de ${actionDescription} foi de ${executionTimeInSeconds.toFixed(2)} segundos.`,
  );
};
