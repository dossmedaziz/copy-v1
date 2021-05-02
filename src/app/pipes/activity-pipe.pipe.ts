import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activityPipe'
})
export class ActivityPipePipe implements PipeTransform {

  transform(activities , searchKey): [] {
    if(!activities || !searchKey)
    {
      return activities
    }
    return activities.filter( activity =>
      activity.action.action_name.toLowerCase().includes(searchKey.toLowerCase()) ||
      activity.space.space_name.toLowerCase().includes(searchKey.toLowerCase())      )
  }

}
