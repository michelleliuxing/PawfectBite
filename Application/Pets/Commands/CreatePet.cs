using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Pets.Commands;

public class CreatePet
{
    public class Command : IRequest<string>
    {
        public required Pet Pet { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            // No need to use AsyncAdd because we are not calling database here
            context.Pets.Add(request.Pet);

            await context.SaveChangesAsync(cancellationToken);

            // Nothing can be returned here because it's a Command. But if no Id is returned, we need to rely on the client side to create GUID which is not ideal
            return request.Pet.Id; // return the Id created
        }
    }
}
