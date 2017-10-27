require 'httparty'

class TeamsController < ApplicationController
  before_action :allow_teams_iframe

  def register

  end

  def register_class
    render permission_denied unless access_token

    response = canvas_api('/api/v1/courses', 'enrollment_type=teacher&per_page=100')
    courses = JSON.parse(response.body)

    courses.select!{|course| course['id'].to_s.size < 9 }

    render locals: { courses: courses, base_uri: base_canvas_uri }
  end

  def index
    query_params = {
      per_page: 1000,
      start_date: 1.week.ago.iso8601,
      end_date: 3.weeks.from_now.iso8601,
      context_codes: ["course_#{params[:entity_id]}"],
      type: 'event' #|| 'assignment'
    }

    puts query_params.to_query
    response = canvas_api('/api/v1/calendar_events', query_params.to_query)
    events = JSON.parse(response.body)

    response = canvas_api('/api/v1/calendar_events', query_params.merge(type: 'assignment').to_query)
    assignments = JSON.parse(response.body)

    calendar_items = []
    loop do
      if events.empty?
        calendar_items.push(*assignments)
        break
      elsif assignments.empty?
        calendar_items.push(*events)
        break
      end

      event_start = DateTime.parse(events.first['start_at'])
      assignment_start = DateTime.parse(assignments.first['start_at'])

      calendar_items << (event_start < assignment_start ? events.shift : assignments.shift)
    end

    render plain: calendar_items.to_json
  end

  private

  def allow_teams_iframe
    response.headers['X-Frame-Options'] = 'ALLOW-FROM https://teams.microsoft.com'
  end

  def base_canvas_uri
    URI(session['user']['canvas_host'])
  end

  def canvas_api(path, query = nil)
    url = base_canvas_uri()
    url.path = path
    url.query = query
    response = HTTParty.get(
      url.to_s,
      headers: {'Authorization' => "Bearer #{access_token}"}
    )

  end
end
