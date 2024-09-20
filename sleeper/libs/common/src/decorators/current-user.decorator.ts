import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getCuttentUserByContext = (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(getCuttentUserByContext);
