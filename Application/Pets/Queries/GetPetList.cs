using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Pets.Queries;

public class GetPetList
{
    // Receives query request
    public class Query : IRequest<List<Pet>> {}

    // Returns response from the handler
    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Pet>>
    {
        // Handle method implemented from the interface
        public async Task<List<Pet>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Pets.ToListAsync(cancellationToken);
        }
    }
}
