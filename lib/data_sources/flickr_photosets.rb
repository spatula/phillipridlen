require "flickraw"

class FlickrPhotosets < FlickrDataSource
  identifier :flickr_photosets

  def up
    @flickr = FlickRaw::Flickr.new(
      "e58920fa6d4b19809f9aa213e212aa8e",
      "9302d2e711fde193",
    )
  end

  def items
    photosets.map do |photoset|
      new_item(
        "",
        serialize_photoset(photoset),
        "/#{photoset.id}",
      )
    end
  end

  private

  def photosets
    @photosets ||= @flickr.photosets.getList(
      user_id: current_user.id,
      primary_photo_extras: "url_m,url_sq,url_o"
    )
  end

  def serialize_photoset(photoset)
    {
      id: photoset.id,
      title: photoset.title,
      description: photoset.description,
      primary_photo: {
        id: photoset.primary,
        url_m: photoset.primary_photo_extras.url_m,
        url_sq: photoset.primary_photo_extras&.url_sq,
        # url_o: photoset.primary_photo_extras&.url_o,
      },
    }
  end
end
