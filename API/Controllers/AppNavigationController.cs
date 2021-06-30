using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application._AppNavigation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppNavigationController : BaseController
    {

        [HttpGet]
		public async Task<ActionResult<List<AppNavigationDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

		[HttpGet("{id}")]
		public async Task<ActionResult<AppNavigationDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }


        [HttpPost]
		public async Task<ActionResult<AppNavigationDto>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
		public async Task<ActionResult<AppNavigationDto>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
		public async Task<ActionResult<Unit>> Delete(int id)
		{
			return await Mediator.Send(new Delete.Command { Id = id });
		}
    }
}
