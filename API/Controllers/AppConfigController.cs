using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application._AppConfig;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
 
namespace API.Controllers
{
    public class AppConfigController : AdminController
    {

        [HttpGet]
		public async Task<ActionResult<List<AppConfigDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}", Name = "AppConfigList")]
        [Route("AppConfigList/{id}")]
        public async Task<ActionResult<List<AppConfigDto>>> List(int id)
        {
            //return await Mediator.Send(new List.Query());
            return await Mediator.Send(new ConfigList.Query { Id = id });
        }

		[HttpGet("{id}")]
        [Route("[action]/{id}")]
		public async Task<ActionResult<AppConfigDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

 
        [HttpPost]
		public async Task<ActionResult<AppConfigDto>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
		public async Task<ActionResult<AppConfigDto>> Edit(int id, Edit.Command command)
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
