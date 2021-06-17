using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application._AppUserRole;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppUserRoleController : BaseController
    {

        [HttpGet]
		public async Task<ActionResult<List<AppUserRoleDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

		[HttpGet("{id}")]
        [Route("[action]/{id}")]
		public async Task<ActionResult<AppUserRoleDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpGet("{role}", Name = "RoleList")]
        [Route("RoleList/{role}")]
		public async Task<ActionResult<List<AppUserRoleDto>>> List(int role)
        {
            return await Mediator.Send(new RoleList.Query { role = role });
        }


        [HttpPost]
		public async Task<ActionResult<AppUserRoleDto>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
		public async Task<ActionResult<AppUserRoleDto>> Edit(int id, Edit.Command command)
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
