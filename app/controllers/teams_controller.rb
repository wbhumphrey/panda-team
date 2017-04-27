require 'httparty'

class TeamsController < ApplicationController
  before_action :allow_teams_iframe

  def register

  end

  def register_class
    render permission_denied unless access_token

    response = canvas_api('/api/v1/courses', 'enrollment_type=teacher')
    courses = JSON.parse(response.body)

    render locals: { courses: courses }
  end

  def index
    query_params = {
      start_date: 1.week.ago.iso8601,
      end_date: 3.weeks.from_now.iso8601,
      context_codes: ["course_#{1}"]
    }

    puts query_params.to_query
    response = canvas_api('/api/v1/calendar_events', query_params.to_query)
    # events = JSON.parse(response.body)

    render plain: response.body
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
