require "flickraw"

class FlickrDataSource < ::Nanoc::DataSource
  FLICKR_API_KEY = "wouldnt_you_like_to_know"
  FLICKR_SHARED_SECRET = "shared_but_not_with_you"

  def up
    @flickr = FlickRaw::Flickr.new(
      FLICKR_API_KEY,
      FLICKR_SHARED_SECRET,
    )
  end

  def items
    raise "Implement me"
  end

  private

  def current_user
    @current_user ||= @flickr.urls.lookupUser(url: "https://www.flickr.com/photos/philtr/")
  end
end
