/**
 * Route-Specific Middleware: Request Body Validation
 * Verifies payload format, types and boundary limits
 */
export const validateTransferPayload = (req, res, next) => {
  const { recipient, amount, purpose } = req.body;

  if (req.trace) {
    req.trace.push({
      middleware: 'PayloadValidator',
      detail: `Validating recipient='${recipient}', amount=${amount}, purpose='${purpose}'`
    });
  }

  const errors = [];
  if (!recipient || typeof recipient !== 'string' || recipient.trim().length < 3) {
    errors.push('Recipient name must be at least 3 characters long.');
  }

  if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
    errors.push('Amount must be a positive number greater than 0.');
  }

  if (!purpose || typeof purpose !== 'string') {
    errors.push('Transfer purpose description is required.');
  }

  if (errors.length > 0) {
    const error = new Error(`Validation Failure: ${errors.join(' | ')}`);
    error.status = 400;
    error.details = errors;
    return next(error);
  }

  next();
};
