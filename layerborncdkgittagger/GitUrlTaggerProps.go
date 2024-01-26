package layerborncdkgittagger


type GitUrlTaggerProps struct {
	// A flag on whether to try to normalize the URL found in the git config If enabled, it will turn ssh urls into https urls.
	NormalizeUrl *bool `field:"optional" json:"normalizeUrl" yaml:"normalizeUrl"`
	// The Tag key/name to use.
	TagName *string `field:"optional" json:"tagName" yaml:"tagName"`
}

