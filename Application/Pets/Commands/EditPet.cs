using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Pets.Commands;

public class EditPet
{
    public class Command : IRequest
    {
        public required Pet Pet { get; set; }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var pet = await context.Pets
                    .FindAsync([request.Pet.Id], cancellationToken)
                        ?? throw new Exception("Cannot find pet");

                // pet.Name = request.Pet.Name; can be simplified with automapper to:
                mapper.Map(request.Pet, pet);

                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
