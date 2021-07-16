using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application._AppUserRoleMaster;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppUserRoleMasterController : AdminController
    {

        [HttpGet]
		public async Task<ActionResult<List<AppUserRoleMasterDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}", Name = "RoleUserList")]
        [Route("RoleUserList/{id}")]
		public async Task<ActionResult<List<GroupUserDTO>>> RoleUserList(string id)
        {
            return await Mediator.Send(new GroupUserList.Query{ RoleName = id }  );
        }
	
        [HttpGet("{id}", Name = "Details")]
        [Route("Details/{id}")]
		public async Task<ActionResult<AppUserRoleMasterDto>> Details(string id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpGet("{id}", Name = "IsUserInGroup")]
        [Route("IsUserInGroup/{id}")]
		public async Task<ActionResult<AppUserRoleMasterDto>> IsUserInGroup(string id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }


        [HttpPost("CreateRole")]
		public async Task<ActionResult<AppUserRoleMasterDto>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        //Add user role => post
        [HttpPost("AddUserToRole")]
		public async Task<ActionResult<bool>> AddUserToRole(AddUserToRole.Command command)
        {
            return await Mediator.Send(command);
        }

        //Delete user role => post
        [HttpPost("RemoveUserFromRole")]
		public async Task<ActionResult<bool>> RemoveUserFromRole(RemoveUserFromRole.Command command)
        {
            return await Mediator.Send(command);
        }

        //Get user roles => get

        [HttpPut("{id}")]
		public async Task<ActionResult<AppUserRoleMasterDto>> Edit(string id, Edit.Command command)
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
