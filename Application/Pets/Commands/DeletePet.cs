using System;
using MediatR;
using Persistence;

namespace Application.Pets.Commands;

public class DeletePet
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var pet = await context.Pets
                    .FindAsync([request.Id], cancellationToken)
                        ?? throw new Exception("Cannot find pet");

            context.Remove(pet);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
