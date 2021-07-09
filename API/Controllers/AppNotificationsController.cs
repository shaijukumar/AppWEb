using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application._AppNotifications;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppNotificationsController : AdminController
    {


        // [HttpGet("{id}", Name = "AppStatusList")]
        // [Route("AppStatusList/{id}")]
		// public async Task<ActionResult<List<AppStatusListDto>>> List(int id)
        // {
        //     return await Mediator.Send(new StatusList.Query { Id = id });
        // }
        
		// [HttpGet("{id}")]
        // [Route("[action]/{id}")]
		// public async Task<ActionResult<AppStatusListDto>> Details(int id)
        // {
        //     return await Mediator.Send(new Details.Query { Id = id });
        // }


        [HttpGet(Name = "NotificationList")] //[HttpGet]
        [Route("NotificationList")]
		public async Task<ActionResult<List<AppNotificationsDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet(Name = "NotificationCount")] 
        [Route("NotificationCount")]
		public async Task<ActionResult<int>> Count()
        {
            return await Mediator.Send(new Count.Query());
        }


		[HttpGet("{id}")]
		public async Task<ActionResult<AppNotificationsDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }


        [HttpPost]
		public async Task<ActionResult<AppNotificationsDto>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
		public async Task<ActionResult<AppNotificationsDto>> Edit(int id, Edit.Command command)
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
